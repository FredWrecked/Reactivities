import {Card, Grid, Header, Menu, MenuItem, TabPane} from "semantic-ui-react";
import {useEffect, useState} from "react";
import {Profile, UserActivity} from "../../app/models/profile.ts";
import agent from "../../app/api/agent.ts";
import ProfileActivityCard from "./ProfileActivityCard.tsx";

interface Props {
    profile: Profile
}

export default function ProfileActivities({profile}: Props) {

    const [activeItem, setActiveItem] = useState('future')
    const [loading, setLoading] = useState(false)
    const [userActivities, setUserActivities] = useState<UserActivity[]>([])

    useEffect(() => {
        loadUserActivities(activeItem)
    }, [activeItem]);
    
    async function loadUserActivities(predicate: string) {
        try {
            setLoading(true)
            setUserActivities(await agent.Profiles.listUserActivities(profile.username, predicate))
            setLoading(false)
        }
        catch (error){
            setLoading(false)
        }

    }
    
    return (
        <TabPane loading={loading}>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='calendar' content='Activities'/>
                    <Menu pointing secondary style={{width: '100%'}}>
                        <MenuItem
                            name='futureEvents'
                            active={activeItem === 'future'}
                            onClick={() => setActiveItem('future')}
                        />
                        <MenuItem
                            name='pastEvents'
                            active={activeItem === 'past'}
                            onClick={() => setActiveItem('past')}
                        />
                        <MenuItem
                            name='hosting'
                            active={activeItem === 'hosting'}
                            onClick={() => setActiveItem('hosting')}
                        />
                    </Menu>
                </Grid.Column>
                <Grid.Column width={16}>
                    <Grid.Column width={16}>
                        <Card.Group itemsPerRow={4}>
                            {userActivities.map(userActivity => (
                                <ProfileActivityCard key={userActivity.id} activity={userActivity}/>
                            ))}
                        </Card.Group>
                    </Grid.Column>
                </Grid.Column>
            </Grid>
        </TabPane>
    )
}