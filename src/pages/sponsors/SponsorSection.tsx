import SponsorCategory from "src/pages/sponsors/SponsorCategory";
import sponsors from "src/data/SponsorData.json";

export default function SponsorSection() {
  return (
    <>
      <SponsorCategory
        category="Gold"
        colour="#FFD700"
        sponsors={sponsors.gold}
      />
      <SponsorCategory
        category="Silver"
        colour="#C0C0C0"
        sponsors={sponsors.silver}
      />
      <SponsorCategory
        category="Bronze"
        colour="#C67F32"
        sponsors={sponsors.bronze}
      />
    </>
  );
}
