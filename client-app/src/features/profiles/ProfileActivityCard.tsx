import {UserActivity} from "../../app/models/profile.ts";
import {Card, Image} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {format} from "date-fns";

interface Props {
    activity: UserActivity
}

export default function ProfileActivityCard({activity}: Props) {
    return (
        <Card as={Link} to={`/activities/${activity.id}`}>
            <Image src={`/public/assets/categoryImages/${activity.category}.jpg`}/>
            <Card.Content textAlign='center'>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Description>{format(activity.date, 'do LLL')}</Card.Description>
                <Card.Description>{format(activity.date, 'h:m a')}</Card.Description>
            </Card.Content>
        </Card>
    )
}