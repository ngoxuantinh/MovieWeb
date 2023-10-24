
import LazyLoad from 'react-lazyload';

import PosterLink from 'components/PosterLink';
import Scenery from 'components/Scenery';
import DetailsPanelWrapper from 'components/DetailsPanelWrapper';
import PosterTitle from 'components/PosterTitle';
// import RatingInfo from './RatingInfo';
import LINKS from 'utils/constants/links';
import CLASS_NAMES from 'utils/constants/class-names';
import { W342H513 } from 'config/image-sizes';
import QUERY_PARAMS from 'utils/constants/query-params';
import MovieSummary from 'components/MovieSummary';

const POSTER_LINK_CLASS_NAME = 'poster-link';
const POSTER_TITLE_CLASS_NAME = 'poster-title-color';
const RATING_INFO_CLASS_NAME = 'rating-info-color';

const MovieListItem = ({
  theme,
  movie,
  baseUrl,
  fetchpriority
}) => (
  <>
    <LazyLoad
      height={200}
      offset={1400}>
      <PosterLink
        className={POSTER_LINK_CLASS_NAME}
        href={{
          pathname: LINKS.MOVIE.HREF,
          query: {
            [QUERY_PARAMS.ID]: movie.id,
            [QUERY_PARAMS.PAGE]: 1
          }
        }}>
        <Scenery
          width={W342H513.WIDTH}
          height={W342H513.HEIGHT}
          fetchpriority={fetchpriority}
          src={`${baseUrl}w${W342H513.WIDTH}${movie.poster_path}`} />
        <DetailsPanelWrapper theme={theme}>
          <PosterTitle
            theme={theme}
            className={POSTER_TITLE_CLASS_NAME}>
            {movie.title}
          </PosterTitle>
          <div className='languages-runtime-release description' >
            {movie.overview}
          </div>
        </DetailsPanelWrapper>
      </PosterLink>
    </LazyLoad>
    <style jsx>{`
      :global(.${POSTER_LINK_CLASS_NAME}:hover .${CLASS_NAMES.IMAGE_LOADING_PLACEHOLDER}) {
        box-shadow: ${theme.shadows[0]};
        border-radius: 0;
      }

      :global(.${POSTER_LINK_CLASS_NAME}:hover .${POSTER_TITLE_CLASS_NAME}) {
        color: var(--palette-text-primary);
      }

      :global(.${POSTER_LINK_CLASS_NAME}:hover .${RATING_INFO_CLASS_NAME} .${CLASS_NAMES.RATING}) {
        color: var(--palette-warning-light);
      }
      .description{
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 25px;
        -webkit-line-clamp: 3;
        height: 75px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }
    `}</style>
  </>
);

export default MovieListItem;
