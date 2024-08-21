import {Tab} from "semantic-ui-react"
import ProfilePhotos from "./ProfilePhotos.tsx";
import {Profile} from "../../app/models/profile.ts";
import {observer} from "mobx-react-lite";
import ProfileDetails from "./ProfileDetails.tsx";
import ProfileFollowings from "./ProfileFollowings.tsx";
import {useStore} from "../../app/stores/store.ts";
import ProfileActivities from "./ProfileActivities.tsx";


interface Props {
    profile: Profile
}
export default observer(function ProfileContent({profile}: Props) {
    
    const {profileStore} = useStore()
    
    const panes = [
        {menuItem: 'About', render:() => <ProfileDetails profile={profile}/>},
        {menuItem: 'Photos', render:() => <ProfilePhotos profile={profile}/>},
        {menuItem: 'Events', render:() => <ProfileActivities profile={profile}/>},
        {menuItem: 'Followers', render:() => <ProfileFollowings/>},
        {menuItem: 'Following', render:() => <ProfileFollowings/>},
    ]
    
    return (
        <Tab
            menu={{fluid: true, vertical: true}}
            menuPosition='right'
            panes={panes}
            onTabChange={(_, data) => 
                profileStore.setActiveTab(data.activeIndex as number)}
        />
        
    )
})