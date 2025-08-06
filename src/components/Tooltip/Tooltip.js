import MuiTooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

const Tooltip = styled(({ className, ...props }) => (
    <MuiTooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontFamily: 'inherit',
        fontSize: 'inherit',
    },
}));

export default Tooltip;