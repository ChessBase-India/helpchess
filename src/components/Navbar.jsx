import styled from "styled-components";

const routes = [
    {
        label: 'about',
    },
    {
        label: 'stories of change',
    },
    {
        label: 'scholarships',
    }
];

const NavbarContainer = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    padding: 0 2rem;
`;

const NavLinks = styled.div`
    display: flex;
    gap: 2.5rem;
    align-items: center;
    margin-left: auto;
`;

const NavLink = styled.a`
    text-decoration: none;
    color: #1a1a1a;
    font-size: 1rem;
    text-transform: lowercase;
    cursor: pointer;
    &:hover {
        color: #666;
    }
`;

const SupportButton = styled.button`
    background-color: #ee6c6c;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 25px;
    font-weight: 500;
    cursor: pointer;
    text-transform: uppercase;
    &:hover {
        background-color: #d65c5c;
    }
`;

export default function Navbar() {

    const handleNavClick = (label) => (e) => {
        e.preventDefault();
        let scrollToSection
        switch (label) {
            case 'about':
                scrollToSection = document.getElementById('about');
                if (scrollToSection) {
                    scrollToSection.scrollIntoView({ behavior: 'smooth' });
                }
                break;
            case 'stories of change':
                scrollToSection = document.getElementById('stories');
                if (scrollToSection) {
                    scrollToSection.scrollIntoView({ behavior: 'smooth' });
                }
                break;
            case 'scholarships':
                scrollToSection = document.getElementById('scholarships');
                if (scrollToSection) {
                    scrollToSection.scrollIntoView({ behavior: 'smooth' });
                }
                break;
            default:
                break;
        }
    };

    const handleSupportClick = () => {
        const donateSection = document.getElementById('donate');
        if (donateSection) {
            donateSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <NavbarContainer>
            <img src="/images/logo.png" alt="HELPCHESSFOUNDATION" style={{ width: '6.303rem', height: '2rem' }} />
            <NavLinks>
                {routes.map((route) => (
                    <NavLink 
                        key={route.label} 
                        onClick={handleNavClick(route.label)}
                    >
                        {route.label}
                    </NavLink>
                ))}
                <SupportButton onClick={handleSupportClick}>
                    Support Now
                </SupportButton>
            </NavLinks>
        </NavbarContainer>
    );
}