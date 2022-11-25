export const PhotoPreviewModal = ({ src }: { src: string | null }) => {
  return <>{src && <img style={{ height: '100%', width: '100%' }} src={src} />}</>;
};
