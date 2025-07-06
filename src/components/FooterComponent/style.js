import styled from 'styled-components';

export const FooterWrapper = styled.div`
    padding: 40px 20px;
    max-width: 1200px;
    margin: 0 auto;
`;

export const FooterTitle = styled.h3`
    font-size: 18px;
    color: #2BB3A9;
    margin-bottom: 16px;
`;

export const FooterText = styled.p`
    font-size: 14px;
    color: #6b7280;
    margin: 6px 0;
`;

export const FooterBottom = styled.div`
    border-top: 1px solid #e5e7eb;
    margin-top: 30px;
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    font-size: 13px;
    color: #9ca3af;
`;

export const SocialLinks = styled.div`
    display: flex;
    gap: 16px;
    margin-top: 10px;
`;

export const SocialIcon = styled.a`
    font-size: 20px;
    color: #6b7280;
    transition: color 0.3s;

    &:hover {
        color: #2BB3A9;
    }
`;
