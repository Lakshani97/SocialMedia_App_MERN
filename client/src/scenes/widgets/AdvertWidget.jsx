import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="http://localhost:3001/assets/info4.jpeg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>SephoraCosmetics</Typography>
        <Typography color={medium}>sephora.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Unlock the secrets of timeless beauty with our luxurious cosmetic line,
        where science meets elegance to unveil your inner allure and elevate
        your glamour to new heights
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
