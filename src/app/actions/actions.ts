"use server"

import { UserSchema } from "@/schemas/User"
import { actionClient } from "@/lib/safe-action"
import { flattenValidationErrors } from "next-safe-action"

export const saveUserAction = actionClient
    .schema(UserSchema, {
        handleValidationErrorsShape: (ve) => flattenValidationErrors(ve).fieldErrors,
    })
    .action(async ({ parsedInput: { id, firstname, lastname, email } }) => {

        await fetch(`http://localhost:3500/users/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstname: firstname,
                lastname: lastname,
                email: email,
            })
        })

        //throw new Error("Dave Error")

        return { message: "User Updated! 🎉" }
    })