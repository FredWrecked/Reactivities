import {Profile} from "../../app/models/profile.ts";
import {observer} from "mobx-react-lite";
import {Card, Icon, Image} from "semantic-ui-react";
import {Link} from "react-router-dom";
import FollowButton from "./FollowButton.tsx";

interface Props {
    profile: Profile
}

export default observer(function ProfileCard({profile}: Props) {
    return (
        <Card as={Link} to={`/profiles/${profile.username}`}>
            <Image src={profile.image || 'assets/user.png'}/>
            <Card.Content>
                <Card.Header>{profile.displayName}</Card.Header>
                <Card.Description  style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{profile.bio}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Icon name='user'/>
                {profile.followersCount} followers
            </Card.Content>
            <FollowButton profile={profile}/>
        </Card>
    )
})