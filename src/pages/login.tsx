import { Button, FormControl, TextField } from "@mui/material"
import styles from '@/styles/AuthenticationPage.module.css'
import Router from "next/router"

const AuthenticationPage: React.FC = () => {
    return (
    <>
        <main className={styles.main}>
            <form>
                    <TextField id="standard-basic" label="Login" variant="standard"/>
                    <TextField id="standard-basic" label="Password" variant="standard" type="password"/>     
                    <Button variant="contained" onClick={() => Router.push('./configuration')}>Submit</Button>           
            </form>
        </main>
    </>
    )
}
export default AuthenticationPage