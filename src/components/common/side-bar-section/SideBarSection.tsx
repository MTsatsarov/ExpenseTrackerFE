import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

interface ISideBarSectionProps {
    location: string;
    onClick: (section: string) => void;
    icon: any;
    sectionName: string;
    currSection: string;
}
const SideBarSection = (props: ISideBarSectionProps) => {
    const { location, onClick, icon, sectionName, currSection } = props;
    return (
        <Link
            to={location}
            style={{ cursor: 'pointer', textDecoration: 'none' }}
        >
            <ListItem
                sx={{
                    alignSelf: 'flex-start',
                    justifySelf: 'flex-end',
                    cursor: 'pointer',
                }}
                button
                onClick={() => onClick(location)}
                selected={currSection.includes(location)}
            >
                <ListItemIcon
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                    }}
                >
                    {icon}
                </ListItemIcon>
                <ListItemText>
                    <span
                        style={{
                            fontSize: '0.9em',
                            fontWeight: 300,
                            color: 'white',
                        }}
                    >
                        {sectionName}
                    </span>
                </ListItemText>
            </ListItem>
        </Link>
    );
};

export default SideBarSection;
