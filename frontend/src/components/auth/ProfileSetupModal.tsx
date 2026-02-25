import { useState } from 'react';
import { useSaveCallerUserProfile } from '../../hooks/useQueries';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, User } from 'lucide-react';
import { toast } from 'sonner';

interface ProfileSetupModalProps {
  onComplete: () => void;
}

export default function ProfileSetupModal({ onComplete }: ProfileSetupModalProps) {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [open, setOpen] = useState(true);
  const saveMutation = useSaveCallerUserProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Please enter your name');
      return;
    }
    try {
      await saveMutation.mutateAsync({ name: name.trim(), bio: bio.trim() });
      toast.success('Profile saved!');
      setOpen(false);
      onComplete();
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(`Failed to save profile: ${error.message}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <div className="w-12 h-12 bg-crimson-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <User className="w-6 h-6 text-crimson-600" />
          </div>
          <DialogTitle className="text-center font-display text-xl">Welcome to Inside Pet Tech</DialogTitle>
          <DialogDescription className="text-center">
            Set up your admin profile to get started.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="profile-name">Your Name *</Label>
            <Input
              id="profile-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              autoFocus
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profile-bio">Bio (optional)</Label>
            <Textarea
              id="profile-bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Brief bio or role description..."
              rows={3}
            />
          </div>
          <Button
            type="submit"
            disabled={saveMutation.isPending}
            className="w-full bg-crimson-600 hover:bg-crimson-700 text-white"
          >
            {saveMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
              </>
            ) : (
              'Save Profile'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
