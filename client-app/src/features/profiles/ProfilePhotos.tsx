import {observer} from "mobx-react-lite";
import {Card, Header, TabPane, Image, Grid, Button} from "semantic-ui-react";
import {Photo, Profile} from "../../app/models/profile.ts";
import {useStore} from "../../app/stores/store.ts";
import {useState} from "react";
import PhotoUploadWidget from "../../app/common/imageUpload/PhotoUploadWidget.tsx";

interface Props {
    profile: Profile
}

export default observer(function ProfilePhotos({profile}: Props) {
    const {profileStore: {isCurrentUser, uploadPhoto, 
        uploading, loading, setMainPhoto, deletePhoto}} = useStore()
    const [addPhotoMode, setAddPhotoMode] = useState(false)
    const [target, setTarget] = useState('')
    function handlePhotoUpload(file: Blob) {
        uploadPhoto(file).then(() => setAddPhotoMode(false))
    }
    
    function handleSetMainPhoto(photo: Photo) {
        setTarget(`setMain-${photo.id}`);
        setMainPhoto(photo)
    }
    
    function handleDeletePhoto(photo: Photo) {
        setTarget(`delete-${photo.id}`);
        deletePhoto(photo)
    }
    
    return (
        <TabPane>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='image' content='Photos'/>
                    {isCurrentUser && (
                        <Button 
                            floated='right'
                            basic 
                            content={addPhotoMode ? 'Cancel': 'Add Photo'}
                            onClick={() => setAddPhotoMode(!addPhotoMode)}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width={16}>
                    {addPhotoMode ? (
                     <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={uploading}/>   
                    ) :
                        <Card.Group itemsPerRow={5}>
                            {profile.photos.map( photo => (
                                <Card key={photo.id}>
                                    <Image src={photo.url}/>
                                    {isCurrentUser &&
                                        <Button.Group fluid widths={2}>
                                            <Button
                                                basic
                                                color='green'
                                                content='Main'
                                                name={`setMain-${photo.id}`}
                                                disabled={photo.isMain}
                                                loading={target === `setMain-${photo.id}` && loading}
                                                onClick={() => handleSetMainPhoto(photo)}
                                            />
                                            <Button 
                                                onClick={() => handleDeletePhoto(photo)}
                                                loading={target === `delete-${photo.id}` && loading}
                                                disabled={photo.isMain}
                                                name={`delete-${photo.id}`}
                                                basic
                                                color='red'
                                                icon='trash'
                                            />
                                        </Button.Group>
                                    }
                                </Card>
                            ))}
                        </Card.Group>
                    }
                </Grid.Column>
            </Grid>
        </TabPane>
    )
})