import { Box } from "@material-ui/core";

interface SponsorCardProps {
  sponsor: {
    image: string;
  };
}

export default function SponsorCard(props: SponsorCardProps) {
  const { sponsor } = props;
  return (
    <Box m={2}>
      <img
        src={sponsor.image}
        style={{
          width: "100%",
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          borderTopRightRadius: 5,
          borderTopLeftRadius: 5,
          overflow: "hidden",
          background: "white",
        }}
      />
    </Box>
  );
}
