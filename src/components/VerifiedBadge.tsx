interface VerifiedBadgeProps {
  verified: boolean;
}

export function VerifiedBadge({ verified }: VerifiedBadgeProps) {
  if (!verified) return null;
  return <span className="bg-[#3B82F6] text-white border-2 border-black w-5 h-5 flex items-center justify-center rounded-full text-xs ml-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">✓</span>;
}
