import Title from "../components/Title.tsx";
import FrameLayout from "../layouts/FrameLayout.tsx";
import BaseLayout from "../layouts/BaseLayout.tsx";

export default function NextSevenDays(){
    return(
        <BaseLayout>
            <FrameLayout>
                <Title/>
            </FrameLayout>
        </BaseLayout>
    )
}