import Button from "./button"

const ApiCard = () => {
    return (
        <div className="text-center flex flex-col gap-10">

        <h1 className="font-semibold">Login or sign up to create and Manage API keys for third party integration</h1>

        <div className="justify-center items-center flex gap-10">
    <Button variant="outline">
        Login
    </Button>
    <Button variant="solid">
        SignUp
    </Button>
       </div>

      
        </div>
    )
}

export default ApiCard