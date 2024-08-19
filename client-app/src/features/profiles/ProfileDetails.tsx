import {observer} from "mobx-react-lite";
import {Button, Grid, Header, TabPane} from "semantic-ui-react";
import {Profile} from "../../app/models/profile.ts";
import ProfileForm from "./ProfileForm.tsx";
import {useStore} from "../../app/stores/store.ts";
import {useState} from "react";

interface Props {
    profile: Profile
}


export default observer(function ProfileDetails({profile}: Props) {
    const {profileStore: {isCurrentUser}} = useStore()
    const [editMode, setEditMode] = useState(false)
    return (
        <TabPane>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='user' content={`About ${profile.displayName}`}/>
                    {isCurrentUser && (
                        <Button
                            floated='right'
                            basic
                            content={editMode ? 'Cancel': 'Edit Profile'}
                            onClick={() => setEditMode(!editMode)}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width={16}>
                    {editMode ? <ProfileForm profile={profile} setEditMode={setEditMode}/> :
                    <p style={{whiteSpace: 'pre-line'}}>{profile.bio}</p>
                    }
                </Grid.Column>
            </Grid>

        </TabPane>
    )
})