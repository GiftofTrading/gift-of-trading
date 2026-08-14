import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

interface MasterclassCourseCardProps {
  onApplyClick: () => void;
  isNew?: boolean;
}

export function MasterclassCourseCard({ onApplyClick, isNew = false }: MasterclassCourseCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="bg-gradient-to-r from-[#0a1628] to-[#1a2a3a] p-6 text-white">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold mb-2">Options Academy: Zero to Pro</h3>
            {isNew && <Badge className="bg-[#c9a84c] text-black">New Arrival</Badge>}
          </div>
        </div>
        <p className="text-gray-300 mb-6">
          Learn the tools, resources, and mindset hacks for long-term success. Build your financial freedom—one option at a time.
        </p>

        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#c9a84c] flex-shrink-0 mt-0.5" />
            <span className="text-sm">Comprehensive options trading education</span>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#c9a84c] flex-shrink-0 mt-0.5" />
            <span className="text-sm">Tools, resources, and mindset training</span>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#c9a84c] flex-shrink-0 mt-0.5" />
            <span className="text-sm">Lifetime access to course materials</span>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#c9a84c] flex-shrink-0 mt-0.5" />
            <span className="text-sm">One-on-one Zoom consultation included</span>
          </div>
        </div>

        <div className="bg-white/10 rounded-lg p-4 mb-6">
          <div className="mb-4">
            <p className="text-sm text-gray-300 mb-2">Taught by</p>
            <p className="text-lg font-semibold">Sounia Gill</p>
            <p className="text-sm text-gray-400">Founder & Trading Expert</p>
          </div>
          <div className="border-t border-white/20 pt-4">
            <p className="text-sm text-gray-300 mb-3 font-semibold">Program Details:</p>
            <div className="space-y-2 text-sm text-gray-300">
              <p><span className="text-[#c9a84c] font-semibold">Start Date:</span> August 18, 2026</p>
              <p><span className="text-[#c9a84c] font-semibold">Duration:</span> 4 months</p>
              <p><span className="text-[#c9a84c] font-semibold">Schedule:</span> Tuesdays & Thursdays</p>
              <p><span className="text-[#c9a84c] font-semibold">Time:</span> 5:00 - 6:30 PM PST</p>
              <p><span className="text-[#c9a84c] font-semibold">Format:</span> Online (Zoom)</p>
            </div>
          </div>
        </div>

        <Button 
          onClick={onApplyClick}
          className="w-full bg-[#c9a84c] hover:bg-[#b39a3f] text-black font-semibold"
        >
          Enroll Now
        </Button>
        <p className="text-xs text-gray-400 text-center mt-3">
          Limited spots available. Cohort starts August 18th. Enroll today!
        </p>
      </div>
    </Card>
  );
}
