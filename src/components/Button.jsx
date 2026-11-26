import styled from "styled-components";

const StyledButton = styled.button`
  width: fit-content;
  white-space: nowrap;
  border-radius: 0.625rem;
  background: ${({ theme, $secondary }) =>
    $secondary
      ? theme.colors.background
      : `linear-gradient(121deg, #5b2ee8 30%, #7c4dff 100%)`};
  height: 3.25rem;
  padding: 0 1.4rem;
  color: ${({ theme, $secondary }) =>
    $secondary ? theme.colors.primary : theme.colors.background};
  border: ${({ theme, $secondary }) =>
    $secondary ? `1.5px solid ${theme.colors.primary}` : `none`};
  text-align: center;
  font-size: 0.9375rem;
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: 0.01em;
  gap: 0.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    transform 0.2s ease,
    background 0.2s ease;

  .btn-label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.2rem;
  }

  .btn-sub {
    font-size: 0.625rem;
    font-weight: 500;
    letter-spacing: 0.02em;
    opacity: 0.8;
  }

  &:hover {
    transform: translateY(-1px);
    background: ${({ theme, $secondary }) =>
      $secondary
        ? theme.colors.primarySoft
        : `linear-gradient(121deg, #4a1fcf 30%, #6a3cf0 100%)`};
  }

  &:active {
    transform: translateY(0);
  }
`;

const Button = ({ title, subtitle, onClick, secondary, icon, className }) => {
  return (
    <StyledButton
      type="button"
      $secondary={secondary}
      className={className}
      onClick={onClick}
    >
      {icon && (
        // eslint-disable-next-line @next/next/no-img-element -- tiny static SVG
        <img src={icon} alt="" width={16} height={16} />
      )}
      {subtitle ? (
        <span className="btn-label">
          {title}
          <span className="btn-sub">{subtitle}</span>
        </span>
      ) : (
        title
      )}
    </StyledButton>
  );
};

export default Button;
