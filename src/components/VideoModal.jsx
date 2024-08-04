import styled from "styled-components";

const Modal = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  pointer-events: all;
`;

const ModalContent = styled.div`
  position: relative;
  padding: 20px;
  border-radius: 8px;
  pointer-events: all;
`;

const CloseBtn = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  top: -3rem;
  left: 50%;
  background: #f0e68c;
  padding: 1rem;
  border-radius: 50%;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  z-index: 2000;
`;

const ResponsiveIframe = styled.iframe`
  width: 70vw;
  height: 40%;
  aspect-ratio: 16 / 9;
  border: none;
`;
const VideoModal = ({ videoId, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <Modal>
      <ModalContent>
        <CloseBtn onClick={onClose}>&times;</CloseBtn>
        <ResponsiveIframe
          width="inherit"
          height="inherit"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube video player"
        ></ResponsiveIframe>
      </ModalContent>
    </Modal>
  );
};

export default VideoModal;
