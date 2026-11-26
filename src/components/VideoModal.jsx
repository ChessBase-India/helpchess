import { useEffect } from "react";
import styled from "styled-components";

const Modal = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(14, 8, 36, 0.85);
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  z-index: 3000;
  pointer-events: all;
`;

const ModalContent = styled.div`
  position: relative;
  padding-top: 1rem;
  pointer-events: all;
`;

const CloseBtn = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  top: -3.5rem;
  right: 0;
  background: #fff;
  color: #18122b;
  border-radius: 50%;
  border: none;
  font-size: 1.75rem;
  line-height: 1;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: rotate(90deg);
  }
`;

const ResponsiveIframe = styled.iframe`
  display: block;
  width: min(70vw, 1100px);
  height: auto;
  aspect-ratio: 16 / 9;
  border: none;
  border-radius: 1rem;
  box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.6);

  @media (max-width: 768px) {
    width: 92vw;
  }
`;
const VideoModal = ({ videoId, isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <Modal role="dialog" aria-modal="true" onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseBtn type="button" aria-label="Close video" onClick={onClose}>
          &times;
        </CloseBtn>
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
