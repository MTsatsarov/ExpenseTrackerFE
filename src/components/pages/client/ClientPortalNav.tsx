import HistoryIcon from '@mui/icons-material/History';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import { useEffect, useState } from 'react';
import AppDivider from '../../guidlines/divider/AppDivider';
import SideBarSection from '../../common/side-bar-section/SideBarSection';

interface ClientPortalNav {
    changeSection: Function;
}

const ClientPortalNav = (props: ClientPortalNav) => {
    const [currSection, SetCurrSection] = useState<string>(
        window.location.pathname
    );
    const onClick = (newSection: string) => {
        SetCurrSection(newSection);
        var newSectionName = newSection.split('/').pop();
        var sectionName =
            newSectionName &&
            newSectionName?.charAt(0).toUpperCase() + newSectionName?.slice(1);
        props.changeSection(sectionName);
    };

    useEffect(() => {
        var section = window.location.pathname;
        onClick(section);
    }, [currSection]);

    const sections = [
        {
            title: 'Dashboard',
            icon: <DashboardIcon />,
            path: '/portal/user/dashboard',
        },
        {
            title: 'Organization History',
            icon: <HistoryIcon />,
            path: '/portal/user/history',
        },
        {
            title: 'My Organization',
            icon: <ManageAccountsIcon />,
            path: '/portal/user/MyOrganization',
        },
		{
            title: 'Storage',
            icon: <WarehouseIcon />,
            path: '/portal/user/Storage',
        },
		{
            title: 'Settings',
            icon: <ManageAccountsIcon />,
            path: '/portal/user/Settings',
        },
    ];
    return (
		<>
		{sections.map((section) => (
			<div key={section.path}>
				<SideBarSection
					location={section.path}
					onClick={onClick}
					icon={section.icon}
					sectionName={section.title}
					currSection={currSection}
				/>
				<AppDivider style={{ background: '#A2A0A0' }} />
			</div>
		))}
	</>
    );
};
export default ClientPortalNav;
