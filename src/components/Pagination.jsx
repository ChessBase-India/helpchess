import styled from "styled-components";

// 1 … 4 5 6 … 9 — always show first/last, the current page and its neighbours
const pageItems = (current, total) => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const items = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) items.push("…");
  for (let p = start; p <= end; p++) items.push(p);
  if (end < total - 1) items.push("…");
  items.push(total);
  return items;
};

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-top: 1.5rem;
`;

const PageButton = styled.button`
  min-width: 2.5rem;
  height: 2.5rem;
  padding: 0 0.75rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  border-radius: 0.625rem;
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${({ theme, $active }) => ($active ? "#fff" : theme.colors.ink)};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.primary : "transparent"};
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.primary : theme.colors.border};
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;

  &:hover:not(:disabled) {
    color: ${({ theme, $active }) => ($active ? "#fff" : theme.colors.primary)};
    background: ${({ theme, $active }) =>
      $active ? theme.colors.primary : theme.colors.primarySoft};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    .label {
      display: none;
    }
  }
`;

const Ellipsis = styled.span`
  min-width: 1.5rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.light};
`;

export default function Pagination({ page, totalPages, onChange, disabled }) {
  if (totalPages <= 1) return null;

  return (
    <Nav aria-label="Stories pages">
      <PageButton
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={disabled || page === 1}
        aria-label="Previous page"
      >
        ‹ <span className="label">Prev</span>
      </PageButton>
      {pageItems(page, totalPages).map((item, i) =>
        item === "…" ? (
          <Ellipsis key={`gap-${i}`} aria-hidden="true">
            …
          </Ellipsis>
        ) : (
          <PageButton
            key={item}
            type="button"
            $active={item === page}
            aria-current={item === page ? "page" : undefined}
            aria-label={`Page ${item}`}
            disabled={disabled && item !== page}
            onClick={() => item !== page && onChange(item)}
          >
            {item}
          </PageButton>
        ),
      )}
      <PageButton
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={disabled || page === totalPages}
        aria-label="Next page"
      >
        <span className="label">Next</span> ›
      </PageButton>
    </Nav>
  );
}
