import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link2 } from "lucide-react";

export function GitHubInput({ value, onChange }) {
  return (
    <div>
      <Label htmlFor="github" className="text-gray-300">
        GitHub Profile URL
      </Label>
      <div className="relative">
        <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
        <Input
          id="github"
          type="url"
          placeholder="https://github.com/yourusername"
          value={value}
          onChange={onChange}
          className="pl-10 bg-gray-900/50 border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>
      <p className="text-gray-500 text-xs mt-1">
        Enter your full GitHub profile URL
      </p>
    </div>
  );
}