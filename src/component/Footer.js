import styled from "styled-components";
import { maxContent } from "../constants";

const FooterWrapper = styled.footer`
    padding: 16px;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const FooterWidth = styled.div`
    width: 100%;
    max-width: ${maxContent}px;
`;


export default function Footer() {
    return (
        <FooterWrapper>
            <FooterWidth>
                Powered by <a href="https://github.com/CHOYUNSIG">CHOYUNSIG</a>
            </FooterWidth>
        </FooterWrapper>
    );
}