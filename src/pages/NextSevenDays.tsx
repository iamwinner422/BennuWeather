import Title from "../components/Title.tsx";
import FrameLayout from "../layouts/FrameLayout.tsx";
import BaseLayout from "../layouts/BaseLayout.tsx";


interface Props {
    isNight: boolean;
}
export default function NextSevenDays({isNight}: Props){
    return(
        <BaseLayout>
            <FrameLayout isNight={isNight}>
                <Title isNight={isNight}/>
            </FrameLayout>
        </BaseLayout>
    )
}