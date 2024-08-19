import {Form, Formik} from "formik";
import MyTextInput from "../../app/common/form/MyTextInput.tsx";
import MyTextArea from "../../app/common/form/MyTextArea.tsx";
import {Button} from "semantic-ui-react";
import {Profile} from "../../app/models/profile.ts";
import * as Yup from "yup";
import {useStore} from "../../app/stores/store.ts";
import {Dispatch, SetStateAction} from "react";

interface Props {
    profile: Profile
    setEditMode: Dispatch<SetStateAction<boolean>>
}

export default function ProfileForm({profile, setEditMode}: Props) {

    const {profileStore: {updateAbout}} = useStore()

    async function handleFormSubmit(profile: Profile) {
        await updateAbout(profile)
        setEditMode(false)
    }

    const validationSchema = Yup.object({
        displayName: Yup.string().required("Display name is required."),
    })

    return (
        <Formik
            enableReinitialize
            initialValues={profile}
            onSubmit={values => handleFormSubmit(values)}
            validationSchema={validationSchema}>
            {({handleSubmit, isValid, isSubmitting, dirty}) => (
                <Form className={'ui form'} autoComplete={'off'} onSubmit={handleSubmit}>
                    <MyTextInput name='displayName' placeholder='displayName'></MyTextInput>
                    <MyTextArea rows={3} placeholder='Add your bio' name = 'bio'/>
                    <Button
                        disabled={isSubmitting || !dirty || !isValid}
                        loading={isSubmitting} floated='right'
                        positive type='submit' content={'Update profile'}/>
                </Form>
            )}
        </Formik>
    )
}