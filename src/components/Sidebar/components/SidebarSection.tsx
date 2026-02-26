import React from "react";
import { List } from "@mui/material";
import SidebarItem from "./SidebarItem";
import type { MenuItem } from "../../../config/menuConfig";

interface SidebarSectionProps {
    items: MenuItem[];
    isExpanded: boolean;
    onItemClick: () => void;
    currentPath: string;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({
    items,
    isExpanded,
    onItemClick,
    currentPath
}) => {
    return (
        <List sx={{ px: 1.5, py: 0 }}>
            {items.map((item) => (
                <SidebarItem
                    key={item.text}
                    item={item}
                    isExpanded={isExpanded}
                    isActive={currentPath === item.path}
                    onItemClick={onItemClick}
                />
            ))}
        </List>
    );
};

export default SidebarSection;
