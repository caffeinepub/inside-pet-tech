import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

actor {
  // ── Mixins ──────────────────────────────────────────────────────────────────
  include MixinStorage();

  // ── Access Control ──────────────────────────────────────────────────────────
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // ── Types ───────────────────────────────────────────────────────────────────
  public type Category = {
    #startupsAndFunding;
    #aiAndData;
    #veterinaryTech;
    #connectedDevices;
    #marketTrends;
    #interviews;
    #videos;
  };

  public type ContentType = {
    #article;
    #featureStory;
    #interview;
    #video;
  };

  public type ArticleStatus = {
    #draft;
    #published;
    #archived;
  };

  public type Article = {
    id : Text;
    title : Text;
    slug : Text;
    summary : Text;
    body : Text;
    author : Text;
    category : Category;
    contentType : ContentType;
    thumbnailUrl : Text;
    videoUrl : ?Text;
    publishedAt : ?Int;
    status : ArticleStatus;
    featured : Bool;
  };

  public type UserProfile = {
    name : Text;
    bio : Text;
  };

  // ── State ───────────────────────────────────────────────────────────────────
  let articles = Map.empty<Text, Article>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // ── User Profile Functions ──────────────────────────────────────────────────

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only authenticated users can get their profile");
    };
    userProfiles.get(caller);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only authenticated users can save their profile");
    };
    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  // ── Admin Role Management ───────────────────────────────────────────────────

  /// Assign the #admin role to a principal.
  /// AccessControl.assignRole already enforces that only admins can call this.
  public shared ({ caller }) func addAdminPrincipal(user : Principal) : async () {
    AccessControl.assignRole(accessControlState, caller, user, #admin);
  };

  /// Demote a principal back to #guest.
  /// AccessControl.assignRole already enforces that only admins can call this.
  public shared ({ caller }) func removeAdminPrincipal(user : Principal) : async () {
    AccessControl.assignRole(accessControlState, caller, user, #guest);
  };

  // ── Article Write Operations (admin-only) ───────────────────────────────────

  public shared ({ caller }) func createArticle(article : Article) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can create articles");
    };
    articles.add(article.id, article);
  };

  public shared ({ caller }) func updateArticle(id : Text, updatedArticle : Article) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update articles");
    };
    if (not articles.containsKey(id)) {
      Runtime.trap("Article not found: " # id);
    };
    articles.add(id, updatedArticle);
  };

  public shared ({ caller }) func deleteArticle(id : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can delete articles");
    };
    if (not articles.containsKey(id)) {
      Runtime.trap("Article not found: " # id);
    };
    articles.remove(id);
  };

  public shared ({ caller }) func publishArticle(id : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can publish articles");
    };
    switch (articles.get(id)) {
      case (?article) {
        let updated : Article = {
          article with
          status = #published;
          publishedAt = ?Time.now();
        };
        articles.add(id, updated);
      };
      case null { Runtime.trap("Article not found: " # id) };
    };
  };

  public shared ({ caller }) func archiveArticle(id : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can archive articles");
    };
    switch (articles.get(id)) {
      case (?article) {
        let updated : Article = { article with status = #archived };
        articles.add(id, updated);
      };
      case null { Runtime.trap("Article not found: " # id) };
    };
  };

  // ── Article Read Operations ─────────────────────────────────────────────────

  /// Returns ALL articles (including drafts/archived) — admin only.
  public query ({ caller }) func getAllArticles() : async [Article] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view all articles");
    };
    articles.values().toArray();
  };

  /// Returns only published articles — public.
  public query func getPublishedArticles() : async [Article] {
    articles.values().toArray().filter<Article>(
      func(a) { a.status == #published },
    );
  };

  /// Returns published articles in a given category — public.
  public query func getArticlesByCategory(category : Category) : async [Article] {
    articles.values().toArray().filter<Article>(
      func(a) { a.category == category and a.status == #published },
    );
  };

  /// Returns featured published articles — public.
  public query func getFeaturedArticles() : async [Article] {
    articles.values().toArray().filter<Article>(
      func(a) { a.featured and a.status == #published },
    );
  };

  /// Returns a single article by id.
  /// Admins can see any status; others only see published.
  public query ({ caller }) func getArticleById(id : Text) : async ?Article {
    switch (articles.get(id)) {
      case (?article) {
        if (article.status == #published or AccessControl.isAdmin(accessControlState, caller)) {
          ?article;
        } else {
          null;
        };
      };
      case null { null };
    };
  };

  /// Returns published articles by a given author — public.
  public query func getArticlesByAuthor(author : Text) : async [Article] {
    articles.values().toArray().filter<Article>(
      func(a) { a.author == author and a.status == #published },
    );
  };

  /// Full-text search on title among published articles — public.
  public query func searchArticlesByTitle(searchTerm : Text) : async [Article] {
    let lower = searchTerm.toLower();
    articles.values().toArray().filter<Article>(
      func(a) {
        a.title.toLower().contains(#text lower) and a.status == #published
      },
    );
  };

  // ── Seed Data ───────────────────────────────────────────────────────────────

  let sampleArticles : [Article] = [
    {
      id = "1";
      title = "Innovating Pet Startups";
      slug = "innovating-pet-startups";
      summary = "A look at the latest pet tech startups reshaping the industry.";
      body = "<p>This article explores the newest wave of pet-focused startups that are attracting significant venture capital and disrupting traditional markets.</p>";
      author = "Jane Smith";
      category = #startupsAndFunding;
      contentType = #article;
      thumbnailUrl = "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800";
      videoUrl = null;
      publishedAt = ?1_700_000_000_000_000_000;
      status = #published;
      featured = true;
    },
    {
      id = "2";
      title = "AI in Veterinary Care";
      slug = "ai-in-veterinary-care";
      summary = "How artificial intelligence is transforming veterinary practices worldwide.";
      body = "<p>Veterinary clinics are increasingly adopting AI-powered diagnostic tools that can detect diseases earlier and with greater accuracy than traditional methods.</p>";
      author = "Dr. John Doe";
      category = #aiAndData;
      contentType = #article;
      thumbnailUrl = "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800";
      videoUrl = null;
      publishedAt = ?1_700_100_000_000_000_000;
      status = #published;
      featured = false;
    },
    {
      id = "3";
      title = "Wearable Tech for Pets";
      slug = "wearable-tech-for-pets";
      summary = "Exploring smart collars, GPS trackers, and health monitors for animals.";
      body = "<p>Pet owners are rapidly adopting wearable technology to monitor their animals' health, location, and activity levels in real time.</p>";
      author = "Samantha Lee";
      category = #connectedDevices;
      contentType = #featureStory;
      thumbnailUrl = "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800";
      videoUrl = null;
      publishedAt = ?1_700_200_000_000_000_000;
      status = #published;
      featured = true;
    },
    {
      id = "4";
      title = "Vet Tech Startup Interview";
      slug = "vet-tech-startup-interview";
      summary = "Exclusive interview with the CEO of PetTech on the future of animal healthcare.";
      body = "<p>We sat down with the founder of one of the fastest-growing veterinary technology companies to discuss innovation, funding, and the road ahead.</p>";
      author = "David Kim";
      category = #interviews;
      contentType = #interview;
      thumbnailUrl = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800";
      videoUrl = ?"https://example.com/video1.mp4";
      publishedAt = ?1_700_300_000_000_000_000;
      status = #published;
      featured = false;
    },
    {
      id = "5";
      title = "Market Trends in Pet Tech 2024";
      slug = "market-trends-pet-tech-2024";
      summary = "Analyzing the explosive growth of the global pet technology market.";
      body = "<p>Market analysts predict the pet technology sector will exceed $20 billion by 2026, driven by increased pet ownership and demand for connected devices.</p>";
      author = "Emily Chen";
      category = #marketTrends;
      contentType = #article;
      thumbnailUrl = "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800";
      videoUrl = null;
      publishedAt = ?1_700_400_000_000_000_000;
      status = #published;
      featured = false;
    },
    {
      id = "6";
      title = "Smart Feeders Explained";
      slug = "smart-feeders-explained";
      summary = "A comprehensive guide to modern automated pet feeders and their benefits.";
      body = "<p>This guide covers the top smart feeders on the market, their features, connectivity options, and how they can improve your pet's nutrition and routine.</p>";
      author = "Michael Reed";
      category = #veterinaryTech;
      contentType = #article;
      thumbnailUrl = "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=800";
      videoUrl = null;
      publishedAt = ?1_700_500_000_000_000_000;
      status = #published;
      featured = false;
    },
    {
      id = "7";
      title = "Inside the Pet Tech Revolution — Video Tour";
      slug = "pet-tech-revolution-video-tour";
      summary = "A video walkthrough of the most exciting pet technology products of the year.";
      body = "<p>Join our correspondent for an exclusive video tour of the latest innovations showcased at the Global Pet Tech Expo.</p>";
      author = "Laura Nguyen";
      category = #videos;
      contentType = #video;
      thumbnailUrl = "https://images.unsplash.com/photo-1560807707-8cc77767d783?w=800";
      videoUrl = ?"https://example.com/pet-tech-revolution.mp4";
      publishedAt = ?1_700_600_000_000_000_000;
      status = #published;
      featured = true;
    },
  ];

  // Seed articles at canister initialization.
  do {
    for (article in sampleArticles.vals()) {
      articles.add(article.id, article);
    };
  };
};
