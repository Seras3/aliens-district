import { Box } from "@mui/system";
import InfiniteScroll from "react-infinite-scroll-component";


function InfiniteScrollResponsive({
  data,
  cardHeight,
  cardWidth,
  next,
  containerHeight,
  hasMore,
  renderCard, // (height, width, content, index) => CardComponent
  perRow = 1,
  cardVerticalMargin = 25,
}) {

  const renderRow = (height, margin, perRow, arr, index) => {
    let content = {};

    return (
      <Box sx={{ height: height + 2 * margin + 'px' }} key={index}>
        <Box sx={{ display: 'flex', height: '100%' }} flexGrow={1} justifyContent='space-around' alignItems='center'>
          {
            Array.from({ length: perRow }).map((i, idx) => {
              content = index + idx < arr.length ? arr[index + idx] : {};
              return renderCard(cardHeight, cardWidth, content, index + idx);
            })
          }
        </Box>
      </Box >
    );
  }

  return (
    <InfiniteScroll
      dataLength={data.length}
      next={next}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      height={containerHeight}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {data.map((i, index) => {
        if (index % perRow === 0) {
          return renderRow(cardHeight, cardVerticalMargin, perRow, data, index);
        }
        return;
      })}
    </InfiniteScroll>
  );
}

export default InfiniteScrollResponsive;