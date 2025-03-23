export const useVisibility = () => {
    return {
        isHeaderVisible: useState("isHeaderVisible", () => true),
        isSidebarVisible: useState("isSidebarVisible", () => false),
        isFooterVisible: useState("isFooterVisible", () => true)
    };
};