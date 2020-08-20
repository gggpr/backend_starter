import {Resolver, Query} from 'type-graphql';

@Resolver()
class TestResolver {
  @Query(() => String)
  public async test() {
    return 'test';
  }
}
export default TestResolver;
