import { Button } from "@/components/ui/button";
import { Calendar, Clock, Heart, Save, Users } from "lucide-react";

const TestimonialCard = () => {
  return (
    <div className=" overflow-hidden rounded-xl bg-border p-5">
      {/* Content Section */}
      <div className="space-y-4">
        {/* Header */}
        <div>
          <h2 className=" font-semibold ">Daily Motivation</h2>
          <p className="mt-1 text-sm ">
            Join our transformative wellness event and discover powerful
            techniques to manage stress, improve mental clarity, and cultivate
            lasting inner peace.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
