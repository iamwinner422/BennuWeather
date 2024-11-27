import BaseLayout from "../layouts/BaseLayout.tsx";
import FrameLayout from "../layouts/FrameLayout.tsx";
import Title from "../components/Title.tsx";

export default function Home() {
    return (
        <BaseLayout>
            <FrameLayout>
                <Title/>
                <div className="absolute top-0 left-0 right-0 bottom-0 h-full">

                </div>
            </FrameLayout>
        </BaseLayout>
    )
}