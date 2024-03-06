import { screen } from "@testing-library/react";
import { render } from "../../../utils/test-utils";
import BlogList from "../BlogList";
import { Blog } from "../../../types/blogTypes";

const blogs: Blog[] = [
  {
    id: "0b4887a7-1850-4eca-846c-a7d527d5961d",
    title: "Eco-Friendly Living: Simple Steps to Reduce Your Carbon Footprint",
    content:
      '<p class="ql-align-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris odio ipsum, mollis vitae massa mattis, vestibulum fermentum est. Aliquam tristique pulvinar elit, ac vulputate nunc luctus a. Mauris elit eros, imperdiet varius tincidunt vel, ullamcorper at quam. Praesent a velit maximus, finibus augue a, pharetra diam. In vitae risus libero. Duis volutpat non diam sed molestie. Nunc sit amet enim quis eros condimentum fermentum. Cras molestie erat et pellentesque pretium. Duis rhoncus urna congue magna hendrerit lacinia. Donec eget felis vel elit vestibulum fringilla eu vitae nisi. Aenean vel ex vitae risus bibendum tempus eu vel ante.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">Integer eu sagittis ipsum. Morbi laoreet felis quis quam placerat, a tempor mi venenatis. Duis purus erat, suscipit convallis viverra a, pretium quis justo. Morbi venenatis ullamcorper felis a efficitur. Ut sed convallis turpis. Vestibulum ante enim, viverra quis placerat vitae, lobortis sed nisi. Aliquam risus mauris, sodales ut blandit semper, pretium ut velit. Maecenas id odio varius, tincidunt purus vitae, ultrices orci. Nunc felis mauris, commodo ut velit vitae, lacinia fringilla tortor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus tempus enim ligula, ut scelerisque lorem vestibulum ac. Nunc pharetra congue ullamcorper.</p><p class="ql-align-justify">Suspendisse quis tempor est. Fusce rhoncus semper tristique. Nulla pellentesque egestas nisi, sit amet tempor nunc. Quisque non maximus ex. Fusce nec auctor nibh. Quisque commodo interdum sem non faucibus. Integer finibus porta eleifend. Duis a sagittis justo.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">Etiam ut dolor ullamcorper magna sodales lobortis. Mauris est mauris, pulvinar vel lobortis vitae, placerat eget tortor. Integer commodo, nulla vel fringilla volutpat, mauris justo laoreet ante, vel dictum nisl lacus nec mi. Vestibulum mi augue, volutpat quis ipsum malesuada, iaculis accumsan erat. Morbi sollicitudin turpis at tempus accumsan. Nullam eget est magna. Sed nibh ipsum, dignissim non maximus non, aliquet sed tortor.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">Duis vel dictum neque, sit amet accumsan odio. Donec faucibus finibus justo, quis tempus eros suscipit id. Aenean consectetur odio ut lorem condimentum, vel euismod magna cursus. Nam vestibulum sodales quam quis auctor. Etiam feugiat porttitor tempor. Proin posuere sagittis diam vitae dignissim. Nulla facilisi. Quisque sed malesuada lacus. In ut urna tristique, cursus risus id, varius libero. Proin feugiat nisl id felis malesuada sagittis. Vestibulum bibendum iaculis sodales. Aliquam erat volutpat. Proin hendrerit tincidunt diam ac elementum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">Suspendisse vehicula dui vitae eros tristique molestie. In vitae mi eu ex feugiat consequat. Nulla facilisi. Aliquam eleifend imperdiet neque. Integer at sem vestibulum, hendrerit nulla at, accumsan est. Mauris elit arcu, maximus ut leo eget, molestie dignissim neque. Nam sodales quis nisi non feugiat. Sed aliquam urna sit amet urna faucibus fringilla non vitae mauris. Aenean neque turpis, eleifend eget nisi nec, malesuada bibendum libero. Praesent in mattis justo. Aliquam in nulla nec leo cursus interdum ultrices eget neque. Donec at odio nec diam eleifend pretium eget in diam. Curabitur ullamcorper pharetra leo nec eleifend. Ut sit amet justo a nibh facilisis congue id sed odio. Donec commodo, mi quis sodales vestibulum, ex magna venenatis metus, at consectetur lacus diam sed risus.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">Suspendisse potenti. In ultrices leo nec malesuada efficitur. In in tellus eu purus porta pretium a tincidunt nulla. Curabitur a mi id libero porttitor egestas eu at dolor. Quisque blandit porta dolor, vel dapibus magna accumsan non. Mauris eros nibh, aliquam ut enim eu, finibus rutrum justo. Nunc id quam lacus. Integer fermentum tellus vel elit dapibus semper.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">Pellentesque nec volutpat risus. Nunc erat libero, feugiat vitae tincidunt ac, bibendum ut ligula. Nunc lorem arcu, luctus in gravida non, suscipit a lacus. Curabitur egestas vulputate leo vel placerat. Nunc non blandit odio. Nulla posuere, enim in ornare hendrerit, purus metus luctus odio, et lacinia felis felis eu dolor. Integer posuere in est vitae hendrerit. Nam mauris lacus, mollis sodales fermentum vitae, ultrices nec sapien. Sed efficitur lectus lacus, ut venenatis elit commodo in. Aenean malesuada nibh eu ligula vulputate, sit amet scelerisque tortor auctor. Nunc a consequat leo.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">Suspendisse nec quam suscipit diam euismod elementum. In eu tellus ut arcu fringilla consequat ac eu urna. Nullam rhoncus nisl eget nisi viverra malesuada. Nam semper neque in orci auctor, cursus molestie nisi viverra. Donec aliquam at justo sit amet gravida. Mauris vehicula justo malesuada dapibus varius. In mattis tortor ac nibh tincidunt, eu pulvinar mi euismod.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">Sed vel fringilla felis. In porttitor ipsum ut lorem vehicula viverra. Cras lobortis quis mi et dapibus. Aenean lobortis mollis quam, sed efficitur mi venenatis sagittis. Nulla enim erat, consequat a molestie non, ultricies et est. Phasellus a velit ut dui vehicula aliquet commodo ut mi. Pellentesque iaculis nunc augue, eu eleifend mi scelerisque ultrices. Aliquam luctus nisl vestibulum, vehicula leo ac, tempus arcu. Mauris at ipsum sed sem semper vestibulum eget eu metus. Etiam ut posuere sem, a consequat magna. Vivamus tempus a dui eget imperdiet.</p>',
    featured: false,
    createdAt: "2024-03-02T22:19:03.406Z",
    updatedAt: "2024-03-02T22:19:03.406Z",
    categories: "Sustainability, Lifestyle",
    imageUrl:
      "https://res.cloudinary.com/ddxxsib3q/image/upload/v1707837365/blog_fullstack_app/eco-living_zl6vdz.jpg",
    author: {
      id: "d29aaafe-f1b2-457f-9177-e6b8d726be18",
      username: "cal",
    },
  },
  {
    id: "1d22d535-d77d-4737-b275-9d6a3dc4103d",
    title: "Mastering the Art of Mindful Living",
    content:
      '<p class="ql-align-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris odio ipsum, mollis vitae massa mattis, vestibulum fermentum est. Aliquam tristique pulvinar elit, ac vulputate nunc luctus a. Mauris elit eros, imperdiet varius tincidunt vel, ullamcorper at quam. Praesent a velit maximus, finibus augue a, pharetra diam. In vitae risus libero. Duis volutpat non diam sed molestie. Nunc sit amet enim quis eros condimentum fermentum. Cras molestie erat et pellentesque pretium. Duis rhoncus urna congue magna hendrerit lacinia. Donec eget felis vel elit vestibulum fringilla eu vitae nisi. Aenean vel ex vitae risus bibendum tempus eu vel ante.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">Integer eu sagittis ipsum. Morbi laoreet felis quis quam placerat, a tempor mi venenatis. Duis purus erat, suscipit convallis viverra a, pretium quis justo. Morbi venenatis ullamcorper felis a efficitur. Ut sed convallis turpis. Vestibulum ante enim, viverra quis placerat vitae, lobortis sed nisi. Aliquam risus mauris, sodales ut blandit semper, pretium ut velit. Maecenas id odio varius, tincidunt purus vitae, ultrices orci. Nunc felis mauris, commodo ut velit vitae, lacinia fringilla tortor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus tempus enim ligula, ut scelerisque lorem vestibulum ac. Nunc pharetra congue ullamcorper.</p><p class="ql-align-justify">Suspendisse quis tempor est. Fusce rhoncus semper tristique. Nulla pellentesque egestas nisi, sit amet tempor nunc. Quisque non maximus ex. Fusce nec auctor nibh. Quisque commodo interdum sem non faucibus. Integer finibus porta eleifend. Duis a sagittis justo.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">Etiam ut dolor ullamcorper magna sodales lobortis. Mauris est mauris, pulvinar vel lobortis vitae, placerat eget tortor. Integer commodo, nulla vel fringilla volutpat, mauris justo laoreet ante, vel dictum nisl lacus nec mi. Vestibulum mi augue, volutpat quis ipsum malesuada, iaculis accumsan erat. Morbi sollicitudin turpis at tempus accumsan. Nullam eget est magna. Sed nibh ipsum, dignissim non maximus non, aliquet sed tortor.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">Duis vel dictum neque, sit amet accumsan odio. Donec faucibus finibus justo, quis tempus eros suscipit id. Aenean consectetur odio ut lorem condimentum, vel euismod magna cursus. Nam vestibulum sodales quam quis auctor. Etiam feugiat porttitor tempor. Proin posuere sagittis diam vitae dignissim. Nulla facilisi. Quisque sed malesuada lacus. In ut urna tristique, cursus risus id, varius libero. Proin feugiat nisl id felis malesuada sagittis. Vestibulum bibendum iaculis sodales. Aliquam erat volutpat. Proin hendrerit tincidunt diam ac elementum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">Suspendisse vehicula dui vitae eros tristique molestie. In vitae mi eu ex feugiat consequat. Nulla facilisi. Aliquam eleifend imperdiet neque. Integer at sem vestibulum, hendrerit nulla at, accumsan est. Mauris elit arcu, maximus ut leo eget, molestie dignissim neque. Nam sodales quis nisi non feugiat. Sed aliquam urna sit amet urna faucibus fringilla non vitae mauris. Aenean neque turpis, eleifend eget nisi nec, malesuada bibendum libero. Praesent in mattis justo. Aliquam in nulla nec leo cursus interdum ultrices eget neque. Donec at odio nec diam eleifend pretium eget in diam. Curabitur ullamcorper pharetra leo nec eleifend. Ut sit amet justo a nibh facilisis congue id sed odio. Donec commodo, mi quis sodales vestibulum, ex magna venenatis metus, at consectetur lacus diam sed risus.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">Suspendisse potenti. In ultrices leo nec malesuada efficitur. In in tellus eu purus porta pretium a tincidunt nulla. Curabitur a mi id libero porttitor egestas eu at dolor. Quisque blandit porta dolor, vel dapibus magna accumsan non. Mauris eros nibh, aliquam ut enim eu, finibus rutrum justo. Nunc id quam lacus. Integer fermentum tellus vel elit dapibus semper.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">Pellentesque nec volutpat risus. Nunc erat libero, feugiat vitae tincidunt ac, bibendum ut ligula. Nunc lorem arcu, luctus in gravida non, suscipit a lacus. Curabitur egestas vulputate leo vel placerat. Nunc non blandit odio. Nulla posuere, enim in ornare hendrerit, purus metus luctus odio, et lacinia felis felis eu dolor. Integer posuere in est vitae hendrerit. Nam mauris lacus, mollis sodales fermentum vitae, ultrices nec sapien. Sed efficitur lectus lacus, ut venenatis elit commodo in. Aenean malesuada nibh eu ligula vulputate, sit amet scelerisque tortor auctor. Nunc a consequat leo.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">Suspendisse nec quam suscipit diam euismod elementum. In eu tellus ut arcu fringilla consequat ac eu urna. Nullam rhoncus nisl eget nisi viverra malesuada. Nam semper neque in orci auctor, cursus molestie nisi viverra. Donec aliquam at justo sit amet gravida. Mauris vehicula justo malesuada dapibus varius. In mattis tortor ac nibh tincidunt, eu pulvinar mi euismod.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">Sed vel fringilla felis. In porttitor ipsum ut lorem vehicula viverra. Cras lobortis quis mi et dapibus. Aenean lobortis mollis quam, sed efficitur mi venenatis sagittis. Nulla enim erat, consequat a molestie non, ultricies et est. Phasellus a velit ut dui vehicula aliquet commodo ut mi. Pellentesque iaculis nunc augue, eu eleifend mi scelerisque ultrices. Aliquam luctus nisl vestibulum, vehicula leo ac, tempus arcu. Mauris at ipsum sed sem semper vestibulum eget eu metus. Etiam ut posuere sem, a consequat magna. Vivamus tempus a dui eget imperdiet.</p>',
    featured: false,
    createdAt: "2024-03-02T22:19:03.405Z",
    updatedAt: "2024-03-02T22:19:03.405Z",
    categories: "Mindfulness, Lifestyle",
    imageUrl:
      "https://res.cloudinary.com/ddxxsib3q/image/upload/v1707338799/blog_fullstack_app/mindful_bqq0wm.jpg",
    author: {
      id: "d29aaafe-f1b2-457f-9177-e6b8d726be18",
      username: "cal",
    },
  },
  {
    id: "4589c639-77e6-4acc-8279-2e884e48ce4b",
    title: "Fitness at Home: Building Your Personal Gym on a Budget",
    content:
      '<p class="ql-align-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris odio ipsum, mollis vitae massa mattis, vestibulum fermentum est. Aliquam tristique pulvinar elit, ac vulputate nunc luctus a. Mauris elit eros, imperdiet varius tincidunt vel, ullamcorper at quam. Praesent a velit maximus, finibus augue a, pharetra diam. In vitae risus libero. Duis volutpat non diam sed molestie. Nunc sit amet enim quis eros condimentum fermentum. Cras molestie erat et pellentesque pretium. Duis rhoncus urna congue magna hendrerit lacinia. Donec eget felis vel elit vestibulum fringilla eu vitae nisi. Aenean vel ex vitae risus bibendum tempus eu vel ante.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">Integer eu sagittis ipsum. Morbi laoreet felis quis quam placerat, a tempor mi venenatis. Duis purus erat, suscipit convallis viverra a, pretium quis justo. Morbi venenatis ullamcorper felis a efficitur. Ut sed convallis turpis. Vestibulum ante enim, viverra quis placerat vitae, lobortis sed nisi. Aliquam risus mauris, sodales ut blandit semper, pretium ut velit. Maecenas id odio varius, tincidunt purus vitae, ultrices orci. Nunc felis mauris, commodo ut velit vitae, lacinia fringilla tortor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus tempus enim ligula, ut scelerisque lorem vestibulum ac. Nunc pharetra congue ullamcorper.</p><p class="ql-align-justify">Suspendisse quis tempor est. Fusce rhoncus semper tristique. Nulla pellentesque egestas nisi, sit amet tempor nunc. Quisque non maximus ex. Fusce nec auctor nibh. Quisque commodo interdum sem non faucibus. Integer finibus porta eleifend. Duis a sagittis justo.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">Etiam ut dolor ullamcorper magna sodales lobortis. Mauris est mauris, pulvinar vel lobortis vitae, placerat eget tortor. Integer commodo, nulla vel fringilla volutpat, mauris justo laoreet ante, vel dictum nisl lacus nec mi. Vestibulum mi augue, volutpat quis ipsum malesuada, iaculis accumsan erat. Morbi sollicitudin turpis at tempus accumsan. Nullam eget est magna. Sed nibh ipsum, dignissim non maximus non, aliquet sed tortor.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">Duis vel dictum neque, sit amet accumsan odio. Donec faucibus finibus justo, quis tempus eros suscipit id. Aenean consectetur odio ut lorem condimentum, vel euismod magna cursus. Nam vestibulum sodales quam quis auctor. Etiam feugiat porttitor tempor. Proin posuere sagittis diam vitae dignissim. Nulla facilisi. Quisque sed malesuada lacus. In ut urna tristique, cursus risus id, varius libero. Proin feugiat nisl id felis malesuada sagittis. Vestibulum bibendum iaculis sodales. Aliquam erat volutpat. Proin hendrerit tincidunt diam ac elementum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">Suspendisse vehicula dui vitae eros tristique molestie. In vitae mi eu ex feugiat consequat. Nulla facilisi. Aliquam eleifend imperdiet neque. Integer at sem vestibulum, hendrerit nulla at, accumsan est. Mauris elit arcu, maximus ut leo eget, molestie dignissim neque. Nam sodales quis nisi non feugiat. Sed aliquam urna sit amet urna faucibus fringilla non vitae mauris. Aenean neque turpis, eleifend eget nisi nec, malesuada bibendum libero. Praesent in mattis justo. Aliquam in nulla nec leo cursus interdum ultrices eget neque. Donec at odio nec diam eleifend pretium eget in diam. Curabitur ullamcorper pharetra leo nec eleifend. Ut sit amet justo a nibh facilisis congue id sed odio. Donec commodo, mi quis sodales vestibulum, ex magna venenatis metus, at consectetur lacus diam sed risus.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">Suspendisse potenti. In ultrices leo nec malesuada efficitur. In in tellus eu purus porta pretium a tincidunt nulla. Curabitur a mi id libero porttitor egestas eu at dolor. Quisque blandit porta dolor, vel dapibus magna accumsan non. Mauris eros nibh, aliquam ut enim eu, finibus rutrum justo. Nunc id quam lacus. Integer fermentum tellus vel elit dapibus semper.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">Pellentesque nec volutpat risus. Nunc erat libero, feugiat vitae tincidunt ac, bibendum ut ligula. Nunc lorem arcu, luctus in gravida non, suscipit a lacus. Curabitur egestas vulputate leo vel placerat. Nunc non blandit odio. Nulla posuere, enim in ornare hendrerit, purus metus luctus odio, et lacinia felis felis eu dolor. Integer posuere in est vitae hendrerit. Nam mauris lacus, mollis sodales fermentum vitae, ultrices nec sapien. Sed efficitur lectus lacus, ut venenatis elit commodo in. Aenean malesuada nibh eu ligula vulputate, sit amet scelerisque tortor auctor. Nunc a consequat leo.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">Suspendisse nec quam suscipit diam euismod elementum. In eu tellus ut arcu fringilla consequat ac eu urna. Nullam rhoncus nisl eget nisi viverra malesuada. Nam semper neque in orci auctor, cursus molestie nisi viverra. Donec aliquam at justo sit amet gravida. Mauris vehicula justo malesuada dapibus varius. In mattis tortor ac nibh tincidunt, eu pulvinar mi euismod.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">Sed vel fringilla felis. In porttitor ipsum ut lorem vehicula viverra. Cras lobortis quis mi et dapibus. Aenean lobortis mollis quam, sed efficitur mi venenatis sagittis. Nulla enim erat, consequat a molestie non, ultricies et est. Phasellus a velit ut dui vehicula aliquet commodo ut mi. Pellentesque iaculis nunc augue, eu eleifend mi scelerisque ultrices. Aliquam luctus nisl vestibulum, vehicula leo ac, tempus arcu. Mauris at ipsum sed sem semper vestibulum eget eu metus. Etiam ut posuere sem, a consequat magna. Vivamus tempus a dui eget imperdiet.</p>',
    featured: true,
    createdAt: "2024-03-02T22:19:03.399Z",
    updatedAt: "2024-03-02T22:19:03.399Z",
    categories: "Health, Lifestyle",
    imageUrl:
      "https://res.cloudinary.com/ddxxsib3q/image/upload/v1707416863/blog_fullstack_app/home-fitness_cbj0wz.jpg",
    author: {
      id: "3ce3eefc-6c58-42a7-9c4a-ab9361240eec",
      username: "tania",
    },
  },
  {
    id: "5077685e-c2c3-4217-8336-9d08be6d060e",
    title: "The Art of Minimalism in Home Decor",
    content:
      '<p class="ql-align-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris odio ipsum, mollis vitae massa mattis, vestibulum fermentum est. Aliquam tristique pulvinar elit, ac vulputate nunc luctus a. Mauris elit eros, imperdiet varius tincidunt vel, ullamcorper at quam. Praesent a velit maximus, finibus augue a, pharetra diam. In vitae risus libero. Duis volutpat non diam sed molestie. Nunc sit amet enim quis eros condimentum fermentum. Cras molestie erat et pellentesque pretium. Duis rhoncus urna congue magna hendrerit lacinia. Donec eget felis vel elit vestibulum fringilla eu vitae nisi. Aenean vel ex vitae risus bibendum tempus eu vel ante.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">Integer eu sagittis ipsum. Morbi laoreet felis quis quam placerat, a tempor mi venenatis. Duis purus erat, suscipit convallis viverra a, pretium quis justo. Morbi venenatis ullamcorper felis a efficitur. Ut sed convallis turpis. Vestibulum ante enim, viverra quis placerat vitae, lobortis sed nisi. Aliquam risus mauris, sodales ut blandit semper, pretium ut velit. Maecenas id odio varius, tincidunt purus vitae, ultrices orci. Nunc felis mauris, commodo ut velit vitae, lacinia fringilla tortor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus tempus enim ligula, ut scelerisque lorem vestibulum ac. Nunc pharetra congue ullamcorper.</p><p class="ql-align-justify">Suspendisse quis tempor est. Fusce rhoncus semper tristique. Nulla pellentesque egestas nisi, sit amet tempor nunc. Quisque non maximus ex. Fusce nec auctor nibh. Quisque commodo interdum sem non faucibus. Integer finibus porta eleifend. Duis a sagittis justo.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">Etiam ut dolor ullamcorper magna sodales lobortis. Mauris est mauris, pulvinar vel lobortis vitae, placerat eget tortor. Integer commodo, nulla vel fringilla volutpat, mauris justo laoreet ante, vel dictum nisl lacus nec mi. Vestibulum mi augue, volutpat quis ipsum malesuada, iaculis accumsan erat. Morbi sollicitudin turpis at tempus accumsan. Nullam eget est magna. Sed nibh ipsum, dignissim non maximus non, aliquet sed tortor.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">Duis vel dictum neque, sit amet accumsan odio. Donec faucibus finibus justo, quis tempus eros suscipit id. Aenean consectetur odio ut lorem condimentum, vel euismod magna cursus. Nam vestibulum sodales quam quis auctor. Etiam feugiat porttitor tempor. Proin posuere sagittis diam vitae dignissim. Nulla facilisi. Quisque sed malesuada lacus. In ut urna tristique, cursus risus id, varius libero. Proin feugiat nisl id felis malesuada sagittis. Vestibulum bibendum iaculis sodales. Aliquam erat volutpat. Proin hendrerit tincidunt diam ac elementum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">Suspendisse vehicula dui vitae eros tristique molestie. In vitae mi eu ex feugiat consequat. Nulla facilisi. Aliquam eleifend imperdiet neque. Integer at sem vestibulum, hendrerit nulla at, accumsan est. Mauris elit arcu, maximus ut leo eget, molestie dignissim neque. Nam sodales quis nisi non feugiat. Sed aliquam urna sit amet urna faucibus fringilla non vitae mauris. Aenean neque turpis, eleifend eget nisi nec, malesuada bibendum libero. Praesent in mattis justo. Aliquam in nulla nec leo cursus interdum ultrices eget neque. Donec at odio nec diam eleifend pretium eget in diam. Curabitur ullamcorper pharetra leo nec eleifend. Ut sit amet justo a nibh facilisis congue id sed odio. Donec commodo, mi quis sodales vestibulum, ex magna venenatis metus, at consectetur lacus diam sed risus.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">Suspendisse potenti. In ultrices leo nec malesuada efficitur. In in tellus eu purus porta pretium a tincidunt nulla. Curabitur a mi id libero porttitor egestas eu at dolor. Quisque blandit porta dolor, vel dapibus magna accumsan non. Mauris eros nibh, aliquam ut enim eu, finibus rutrum justo. Nunc id quam lacus. Integer fermentum tellus vel elit dapibus semper.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">Pellentesque nec volutpat risus. Nunc erat libero, feugiat vitae tincidunt ac, bibendum ut ligula. Nunc lorem arcu, luctus in gravida non, suscipit a lacus. Curabitur egestas vulputate leo vel placerat. Nunc non blandit odio. Nulla posuere, enim in ornare hendrerit, purus metus luctus odio, et lacinia felis felis eu dolor. Integer posuere in est vitae hendrerit. Nam mauris lacus, mollis sodales fermentum vitae, ultrices nec sapien. Sed efficitur lectus lacus, ut venenatis elit commodo in. Aenean malesuada nibh eu ligula vulputate, sit amet scelerisque tortor auctor. Nunc a consequat leo.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">Suspendisse nec quam suscipit diam euismod elementum. In eu tellus ut arcu fringilla consequat ac eu urna. Nullam rhoncus nisl eget nisi viverra malesuada. Nam semper neque in orci auctor, cursus molestie nisi viverra. Donec aliquam at justo sit amet gravida. Mauris vehicula justo malesuada dapibus varius. In mattis tortor ac nibh tincidunt, eu pulvinar mi euismod.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">Sed vel fringilla felis. In porttitor ipsum ut lorem vehicula viverra. Cras lobortis quis mi et dapibus. Aenean lobortis mollis quam, sed efficitur mi venenatis sagittis. Nulla enim erat, consequat a molestie non, ultricies et est. Phasellus a velit ut dui vehicula aliquet commodo ut mi. Pellentesque iaculis nunc augue, eu eleifend mi scelerisque ultrices. Aliquam luctus nisl vestibulum, vehicula leo ac, tempus arcu. Mauris at ipsum sed sem semper vestibulum eget eu metus. Etiam ut posuere sem, a consequat magna. Vivamus tempus a dui eget imperdiet.</p>',
    featured: false,
    createdAt: "2024-03-02T22:19:03.391Z",
    updatedAt: "2024-03-02T22:19:03.391Z",
    categories: "Minimalism, Lifestyle",
    imageUrl:
      "https://res.cloudinary.com/ddxxsib3q/image/upload/v1707838200/blog_fullstack_app/home-decor_rkbqig.jpg",
    author: {
      id: "3ce3eefc-6c58-42a7-9c4a-ab9361240eec",
      username: "tania",
    },
  },
];

const testData = {
  blogs,
  hasNextPage: false,
  totalBlogs: 4,
  totalPages: 1,
};

describe("<BlogList />", () => {
  it("should render BlogList with correct number of blogs ", () => {
    render(
      <BlogList
        data={testData}
        isLoading={false}
        isError={false}
        isFetching={false}
        page={1}
        setPage={() => {}}
      />
    );
    expect(screen.getByTestId("blog-list")).toBeInTheDocument();
    const blogItems = screen.getAllByRole("link");
    expect(blogItems).toHaveLength(testData.blogs.length);
  });

  it("should display loading state", () => {
    render(
      <BlogList
        data={undefined}
        isLoading={true}
        isError={false}
        isFetching={false}
        page={1}
        setPage={() => {}}
      />
    );
    expect(screen.getByText(/Loading Blogs.../i)).toBeInTheDocument();
  });

  it("should display error message on fetch error", () => {
    render(
      <BlogList
        data={undefined}
        isLoading={false}
        isError={true}
        isFetching={false}
        page={1}
        setPage={() => {}}
      />
    );
    expect(
      screen.getByText(/Error fetching blogs. Please try again./i)
    ).toBeInTheDocument();
  });

  it("should display no blogs found when data is empty", () => {
    render(
      <BlogList
        data={{ ...testData, blogs: [] }}
        isLoading={false}
        isError={false}
        isFetching={false}
        page={1}
        setPage={() => {}}
      />
    );
    expect(screen.getByText(/No blogs found/i)).toBeInTheDocument();
  });
});
