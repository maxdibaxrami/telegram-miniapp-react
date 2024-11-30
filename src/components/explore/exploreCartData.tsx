import { Avatar } from "@nextui-org/react"

const ExploreCartData = (props) => {

    return <>
        {props.activeIndex === 0 && (
        <p className="text-tiny text-foreground/80">{props.aboutMe}</p>
        )}

        {props.activeIndex !== 0 && (
            <div className="flex gap-3 mt-1">
                <Avatar isBordered radius="md" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />

                <div className="flex flex-col">
                    <p className="text-md">NextUI</p>
                    <p className="text-small text-default-500">nextui.org</p>
                </div>
            </div>
        )}
    </>

}

export default ExploreCartData