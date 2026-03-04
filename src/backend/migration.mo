import Map "mo:core/Map";
import Principal "mo:core/Principal";
import AccessControl "authorization/access-control";

module {
  public type Category = {
    #startupsAndFunding;
    #marketTrends;
    #interviews;
    #newsAndViews;
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

  public type NewsletterSubscription = {
    email : Text;
    timestamp : Int;
  };

  public type OldActor = {
    articles : Map.Map<Text, Article>;
    userProfiles : Map.Map<Principal, UserProfile>;
    newsletterSubscribers : Map.Map<Text, NewsletterSubscription>;
    accessControlState : AccessControl.AccessControlState;
  };

  public type NewActor = {
    articles : Map.Map<Text, Article>;
    userProfiles : Map.Map<Principal, UserProfile>;
    newsletterSubscribers : Map.Map<Text, NewsletterSubscription>;
    accessControlState : AccessControl.AccessControlState;
  };

  public func run(old : OldActor) : NewActor {
    old;
  };
};
