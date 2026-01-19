interface UserProfileProps{
    name:string,
    email:string,
    age:number
}
export default function UserProfile({name,email,age}:UserProfileProps){
    return(
        <div className="user-profile">
            <h3>{name}</h3>
            <p>Email:{email}</p>
            <p>Age:{age}</p>
        </div>

    );
}