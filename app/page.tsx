import { getAllHobbiesMedia } from '@/lib/get-hobbies';
import HomeClient from './page-client';

export default function Home() {
    const media = getAllHobbiesMedia();

    return <HomeClient initialMedia={media} />;
}
