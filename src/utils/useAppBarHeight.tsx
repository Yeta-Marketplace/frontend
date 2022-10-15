// Solution from :
// https://github.com/mui/material-ui/issues/10739
// 
// Note: 
// !!currentToolbarMinHeight is needed in a weird edge case
// when toolbar isn't defined somehow

import { useMediaQuery, useTheme } from '@mui/material';

type MinHeight = {
    minHeight: number,
};

export default function useAppBarHeight(): number {
    const {
        mixins: { toolbar },
        breakpoints,
    } = useTheme();
    const toolbarDesktopQuery = breakpoints.up('sm');
    const toolbarLandscapeQuery = `${breakpoints.up('xs')} and (orientation: landscape)`;
    const isDesktop = useMediaQuery(toolbarDesktopQuery);
    const isLandscape = useMediaQuery(toolbarLandscapeQuery);
    let currentToolbarMinHeight;
    if (isDesktop) {
        currentToolbarMinHeight = toolbar[toolbarDesktopQuery];
    } else if (isLandscape) {
        currentToolbarMinHeight = toolbar[toolbarLandscapeQuery];
    } else {
        currentToolbarMinHeight = toolbar;
    }
    if (!currentToolbarMinHeight) {  // RA
        return 64;
    }
    return (currentToolbarMinHeight as MinHeight).minHeight;
}