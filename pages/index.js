import MainLayout from '../src/layouts/MainLayout'
import Header from '../src/components/Header'
import HomeView from '../src/views/Home'

export default function Home() {
  return (
    <MainLayout>
      <Header title={`COVEST FINANCE`}></Header>
      <HomeView></HomeView>
    </MainLayout>
  )
}
