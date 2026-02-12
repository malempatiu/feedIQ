type UserAvatarProps = {
  firstName: string,
  lastName: string
}

const UserAvatar = ({ firstName, lastName }: UserAvatarProps) => {

  return (
    <div className='
      relative 
      rounded-full 
      overflow-hidden 
      bg-slate-h 
      flex 
      items-center 
      justify-center 
      font-medium 
      text-gray-0
      w-10
      h-10
    '>
      {firstName[0]?.toUpperCase()+lastName[0]?.toUpperCase()}
    </div>
  );
}

export {UserAvatar};
