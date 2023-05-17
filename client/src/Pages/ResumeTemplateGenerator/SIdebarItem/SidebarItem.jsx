import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const StyledSidebarItem = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
    color: #eee;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        color: #fff;
        transform: translateX(10px);
    }

    &:not(:last-child) {
        border-bottom: 1px solid #444;
    }

    &.active {
        background-color: #444;
        border-radius: 10px;
        color: #fff;
    }

    &.active:hover {
        transform: none;
    }

    .sidebar-item-text {
        flex: 1;
    }

    .delete-icon {
        margin-left: 10px;
        color: #bbb;
        font-size: 20px;
    }

    .delete-icon:hover {
        color: #fff;
    }

    @media (max-width: 768px) {
        font-size: 14px;

        .delete-icon {
            font-size: 16px;
        }
    }
`;

const SidebarItem = ({ resume, isActive, onClick, onDelete, setActiveResume }) => {
    return (
        <StyledSidebarItem className={isActive ? "active" : ""} onClick={() => onClick(resume)}>
            <div className='sidebar-item-text'>{`${resume.content?.slice(0, 15).split(" ").join(" ")}...`}</div>
            {isActive && (
                <div
                    className='delete-icon'
                    onClick={() => {
                        onDelete(resume);
                        setActiveResume(undefined);
                    }}
                >
                    <FontAwesomeIcon icon={faTrash} />
                </div>
            )}
        </StyledSidebarItem>
    );
};

export default SidebarItem;
