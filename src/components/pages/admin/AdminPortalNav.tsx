import { useState, useEffect } from 'react';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PaidIcon from '@mui/icons-material/Paid';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import AppDivider from '../../guidlines/divider/AppDivider';
import SideBarSection from '../../common/side-bar-section/SideBarSection';
interface IAdminPortalNavProps {
    changeSection: Function;
}
const AdminPortalNav = (props: IAdminPortalNavProps) => {
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
            title: 'Clients',
            icon: <PeopleAltIcon />,
            path: '/portal/admin/clients',
        },
        {
            title: 'Transactions',
            icon: <ShoppingCartIcon />,
            path: '/portal/admin/transactions',
        },
        {
            title: 'Products',
            icon: <StoreMallDirectoryIcon />,
            path: '/portal/admin/products',
        },
        {
            title: 'Employees',
            icon: <CorporateFareIcon />,
            path: '/portal/admin/employees',
        },
        {
            title: 'Reports',
            icon: <PaidIcon />,
            path: '/portal/admin/reports',
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

export default AdminPortalNav;
