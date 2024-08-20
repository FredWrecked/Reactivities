import {observer} from "mobx-react-lite";
import {useStore} from "../../app/stores/store.ts";
import {Card, Grid, Header, TabPane} from "semantic-ui-react";
import ProfileCard from "./ProfileCard.tsx";

export default observer(function ProfileFollowings() {
    const {profileStore} = useStore()
    const {profile, followings} = profileStore
    
    return (
        <TabPane>
            <Grid.Column width={16}>
                <Header floated='left' icon='user' conetent={`People following ${profile?.displayName}`}/>
            </Grid.Column>
            <Grid.Column width={16}>
                <Card.Group itemsPerRow={4}>
                    {followings.map(profile => (
                        <ProfileCard key={profile.username} profile={profile}/>
                    ))}
                </Card.Group>
            </Grid.Column>
        </TabPane>
    )    
    
})