import InfoCard from "./InfoCard";
import RazorpayButton from "./RazorpayButton";

export default function DonateNowCard(props) {
  return <InfoCard {...props} action={<RazorpayButton />} />;
}
