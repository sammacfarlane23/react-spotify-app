import React from "react";

import MainContent from "../components/NavBar";

const PlaylistsPage = () => <MainContent contentType="playlists" />;

// @TODO Refactor this and MainContent into one parent component
// const PlaylistsPage = () => {
//   const playlists = useSelector((state) => state?.playlist?.data);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getUserPlaylists());
//   }, [dispatch]);

//   // @TODO Use actual loading spinner
//   if (isEmpty(playlists))
//     return (
//       <div className="min-vh-100">
//         <div className="p-5 text-white">Loading...</div>
//       </div>
//     );

//   return (
//     <Container className="min-vh-100">
//       <NavBar />

//       <Row>
//         <Col xs={12} className="px-4">
//           <h1 className="my-4">Your Playlists </h1>
//         </Col>
//       </Row>
//       <Row>
//         <Col xs={12}>
//           <ItemList topList={playlists} />
//         </Col>
//       </Row>
//     </Container>
//   );
// };

export default PlaylistsPage;
