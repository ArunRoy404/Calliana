import AppImage from "@/components/atoms/AppImage";
import Icon from "@/components/atoms/Icon";

/**
 * An icon described by data: an exported asset (`{ src, width, height }`) or,
 * where Figma's export is unusable, a lucide glyph (`{ lucide, size }`). Data
 * files can pick either without the component caring which.
 */
export default function AssetIcon({ icon, className }) {
  if (icon?.src) {
    return (
      <AppImage
        src={icon?.src}
        width={icon?.width}
        height={icon?.height}
        className={className}
      />
    );
  }

  return <Icon name={icon?.lucide} size={icon?.size} className={className} />;
}
