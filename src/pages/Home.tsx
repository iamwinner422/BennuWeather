import BaseLayout from "../layouts/BaseLayout.tsx";
import FrameLayout from "../layouts/FrameLayout.tsx";
import Title from "../components/Title.tsx";

export default function Home() {
    return (
        <BaseLayout>
            <FrameLayout>
                <Title/>
            </FrameLayout>
        </BaseLayout>
    )
}