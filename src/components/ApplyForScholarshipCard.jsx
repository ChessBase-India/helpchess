import Button from "./Button";
import InfoCard from "./InfoCard";
import { SCHOLARSHIP_FORM_URL } from "@/utils/constants";

export default function ApplyForScholarshipCard(props) {
  return (
    <InfoCard
      {...props}
      action={
        <Button
          title="Apply Now"
          icon="/images/icons/plant.svg"
          onClick={() =>
            window.open(SCHOLARSHIP_FORM_URL, "_blank", "noopener,noreferrer")
          }
        />
      }
    />
  );
}
